import multer from "multer";

const storage = multer.diskStorage({});

// TODO : Uploading a single image middleware
const singlUpload = multer({ storage }).single("ProfileAvatar");

// TODO : Uploading a multiple images middleware
export const multipleUpload = multer({ storage }).array("productImages");

export default singlUpload;
