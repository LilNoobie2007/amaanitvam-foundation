    import express from 'express';
    import Gallery from '../models/gallery.js';
    import fs from 'fs';
    import path from 'path';
    import { fileURLToPath } from 'url';
    
    const __filenameGallery = fileURLToPath(import.meta.url);
    const __dirnameGallery = path.dirname(__filenameGallery);
    
    const router = express.Router();
    
    router.get('/', async (req, res) => {
        try {
            const images = await Gallery.find().sort({ createdAt: -1 });
            const mappedImages = images.map(img => ({
                ...img.toObject(),
                imageUrl: img.imageUrl.replace('/uploads/', '/api/gallery/images/')
            }));
            res.status(200).json({ success: true, images: mappedImages });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error fetching gallery.' });
        }
    });

    router.get('/images/:filename', async (req, res) => {
        try {
            const apiSearch = `/api/gallery/images/${req.params.filename}`;
            const uploadSearch = `/uploads/${req.params.filename}`;
            const imageInDb = await Gallery.findOne({ 
                $or: [{ imageUrl: apiSearch }, { imageUrl: uploadSearch }] 
            });
            
            if (imageInDb && imageInDb.imageBuffer) {
                res.set('Content-Type', imageInDb.contentType || 'image/jpeg');
                return res.send(imageInDb.imageBuffer);
            }
            
            const filePath = path.join(__dirnameGallery, '../uploads', req.params.filename);
            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            } else {
                res.status(404).json({ success: false, message: 'Image not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error' });
        }
    });
    
    router.get('/seed', async (req, res) => {
        try {
            const sourceDir = path.join(__dirnameGallery, '../../frontend/assets/images');
            const destDir = path.join(__dirnameGallery, '../uploads');
            const defaultImages = [
                { file: 'project-manthan2.png', title: 'Project Manthan' },
                { file: 'project-shiksha2.png', title: 'Project Shiksha' },
                { file: 'hero.png', title: 'Project Pravah' },
                { file: 'prakruti-seva-samman.jpeg', title: 'Community Ceremony' },
                { file: 'gallery_image_2.png', title: 'Award Recognition' },
                { file: 'gallery_image_3.png', title: 'Internship Drive' }
            ];
    
            if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
            
            await Gallery.deleteMany({});
            let created = 0;
    
            for (const img of defaultImages) {
                const sourcePath = path.join(sourceDir, img.file);
                const destFileName = `seeded_${Date.now()}_${img.file}`;
                const destPath = path.join(destDir, destFileName);
                if (fs.existsSync(sourcePath)) {
                    fs.copyFileSync(sourcePath, destPath);
                    const buffer = fs.readFileSync(sourcePath);
                    const ext = path.extname(img.file).toLowerCase();
                    let mimeType = 'image/jpeg';
                    if (ext === '.png') mimeType = 'image/png';
                    else if (ext === '.gif') mimeType = 'image/gif';
                    
                    await Gallery.create({ 
                        imageUrl: `/api/gallery/images/${destFileName}`, 
                        title: img.title,
                        imageBuffer: buffer,
                        contentType: mimeType
                    });
                    created++;
                }
            }
            res.status(200).json({ success: true, message: `Successfully seeded ${created} images!` });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
    
    export default router;
