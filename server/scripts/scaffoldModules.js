import fs from 'fs';
import path from 'path';

const modules = [
  'auth', 'users', 'candidates', 'members', 'departments', 'tasks', 
  'meetings', 'announcements', 'projects', 'donations', 'certificates', 
  'gallery', 'cms', 'digital-library', 'courses', 'volunteers', 
  'internships', 'reports', 'notifications'
];

const basePath = path.join(process.cwd(), 'server', 'src', 'modules');

const getModelStub = (name) => `import mongoose from 'mongoose';\n\nconst schema = new mongoose.Schema({}, { timestamps: true });\nexport default mongoose.models.${name} || mongoose.model('${name}', schema);\n`;
const getControllerStub = () => `export const getAll = async (req, res, next) => { res.json({ success: true, data: [] }); };\n`;
const getServiceStub = () => `export const doSomething = async () => {};\n`;
const getRoutesStub = (name) => `import express from 'express';\nimport { getAll } from './${name}.controller.js';\n\nconst router = express.Router();\nrouter.get('/', getAll);\nexport default router;\n`;
const getValidationStub = () => `import Joi from 'joi';\n\nexport const createSchema = Joi.object({});\n`;
const getRepositoryStub = () => `export const findAll = async () => [];\n`;

modules.forEach(mod => {
  const modPath = path.join(basePath, mod);
  if (!fs.existsSync(modPath)) {
    fs.mkdirSync(modPath, { recursive: true });
  }

  // Determine file prefix (e.g., 'digital-library' -> 'library')
  const prefix = mod === 'digital-library' ? 'library' : 
                 (mod.endsWith('s') && mod !== 'cms' ? mod.slice(0, -1) : mod);

  const files = {
    [`${prefix}.model.js`]: getModelStub(prefix.charAt(0).toUpperCase() + prefix.slice(1)),
    [`${prefix}.controller.js`]: getControllerStub(),
    [`${prefix}.service.js`]: getServiceStub(),
    [`${prefix}.routes.js`]: getRoutesStub(prefix),
    [`${prefix}.validation.js`]: getValidationStub(),
    [`${prefix}.repository.js`]: getRepositoryStub(),
  };

  // Only create if they don't exist yet so we don't overwrite the ones we manually migrated
  Object.entries(files).forEach(([file, content]) => {
    const filePath = path.join(modPath, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
    }
  });
});

console.log('Successfully scaffolded 18 modules.');
