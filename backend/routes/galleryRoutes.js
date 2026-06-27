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

    router.get('/images/:filename', (req, res) => {
        const filePath = path.join(__dirnameGallery, '../uploads', req.params.filename);
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ success: false, message: 'Image not found' });
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
                    await Gallery.create({ imageUrl: `/uploads/${destFileName}`, title: img.title });
                    created++;
                }
            }
            res.status(200).json({ success: true, message: `Successfully seeded ${created} images!` });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
    
    export default router;
