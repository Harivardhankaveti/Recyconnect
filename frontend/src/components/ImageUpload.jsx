import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, FileImage } from 'lucide-react'

const ImageUpload = ({ 
  onImageSelect, 
  multiple = false, 
  maxSize = 10, // MB
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  className = '',
  label = 'Upload Image',
  required = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use: ${acceptedTypes.join(', ')}`
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }

    return null
  }

  const processFiles = useCallback((files) => {
    const validFiles = []
    const validPreviews = []
    const errors = []

    Array.from(files).forEach((file) => {
      const validationError = validateFile(file)
      if (validationError) {
        errors.push(validationError)
      } else {
        validFiles.push(file)
        const previewUrl = URL.createObjectURL(file)
        validPreviews.push(previewUrl)
      }
    })

    if (errors.length > 0) {
      setError(errors[0])
      setTimeout(() => setError(''), 5000)
      return
    }

    if (multiple) {
      setSelectedFiles(prev => [...prev, ...validFiles])
      setPreviewUrls(prev => [...prev, ...validPreviews])
    } else {
      setSelectedFiles(validFiles)
      setPreviewUrls(validPreviews)
    }

    // Call parent callback
    if (onImageSelect) {
      onImageSelect(multiple ? [...selectedFiles, ...validFiles] : validFiles[0])
    }

    setError('')
  }, [multiple, onImageSelect, selectedFiles, maxSize, acceptedTypes])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFiles(files)
    }
  }, [processFiles])

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files
    if (files.length > 0) {
      processFiles(files)
    }
  }, [processFiles])

  const removeFile = useCallback((index) => {
    if (multiple) {
      const newFiles = selectedFiles.filter((_, i) => i !== index)
      const newPreviews = previewUrls.filter((_, i) => i !== index)
      setSelectedFiles(newFiles)
      setPreviewUrls(newPreviews)
      
      if (onImageSelect) {
        onImageSelect(newFiles)
      }
    } else {
      setSelectedFiles([])
      setPreviewUrls([])
      
      if (onImageSelect) {
        onImageSelect(null)
      }
    }
  }, [multiple, selectedFiles, previewUrls, onImageSelect])

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const clearAll = () => {
    setSelectedFiles([])
    setPreviewUrls([])
    if (onImageSelect) {
      onImageSelect(multiple ? [] : null)
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md"
          >
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Area */}
      {selectedFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
            isDragOver
              ? 'border-eco-500 bg-eco-50'
              : 'border-gray-300 hover:border-eco-400 hover:bg-eco-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <motion.div
            animate={{ scale: isDragOver ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">
              {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSize}MB
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Preview Area */}
      {selectedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Selected {multiple ? 'Files' : 'File'} ({selectedFiles.length})
            </h4>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={openFileDialog}
                className="text-sm text-eco-600 hover:text-eco-700 font-medium"
              >
                Add More
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className={`grid gap-3 ${
            multiple ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'
          }`}>
            {selectedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={previewUrls[index]}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                
                {/* File Info */}
                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-600 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ImageUpload
