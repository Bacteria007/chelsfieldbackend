const multer = require('multer');
const path = require('path');

// Middleware to handle image uploads
const uploadImage = (uploadPath, fields = []) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file) {
        console.log('file is===>>>', file);
        console.log('path is===>>>', uploadPath);
        cb(null, uploadPath);
      } else {
        console.log('image is null');
        return;
      }
    },
    filename: function (req, file, cb) {
      const now = Date.now();
      cb(null, `${file.originalname}${now}${path.extname(file.originalname)}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    // Check the file type based on the file extension
    const allowedExtensions = /jpeg|jpg|png/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      const error = new Error('Only image files are allowed');
      error.code = 'LIMIT_FILE_TYPES';
      return cb(error, false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });

  // Return the appropriate middleware based on the fields array
  if (fields.length > 0) {
    return upload.fields(fields);
  } else {
    return upload.single('image');
  }
};

module.exports = { uploadImage };
