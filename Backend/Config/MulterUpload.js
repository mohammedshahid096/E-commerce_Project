import multer from "multer";

const storage = multer.diskStorage({});

const singlUpload = multer({ storage }).single("ProfileAvatar");

export const multipleUpload = multer({ storage }).array("productImages");

export default singlUpload;
