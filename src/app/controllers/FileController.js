import File from "../models/File.js"

export default new class FileController{
    async store(req, res){
        const {filename: name, path} = req.file
        const file = await File.create({name,path});

        return res.json(req.file);
    }
}