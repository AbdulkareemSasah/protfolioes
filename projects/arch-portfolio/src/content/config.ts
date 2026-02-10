// Content collection configuration for Astro 5
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Settings singletons - using data type for JSON files
const settingsCollection = defineCollection({
    type: 'data',
    schema: z.any(),
});

// Pages collection - using yaml files (Keystatic format)
const pagesCollection = defineCollection({
    loader: glob({ pattern: 'src/content/pages/**/*.yaml' }),
    schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        description: z.string().optional().nullable(),
        ogImage: z.string().optional().nullable(),
        blocks: z.array(z.any()).optional().nullable(),
    }),
});

// Projects collection
const projectsCollection = defineCollection({
    loader: glob({ pattern: 'src/content/projects/**/*.yaml' }),
    schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        description: z.string().optional().nullable(),
        featuredImage: z.string().optional().nullable(),
        gallery: z.array(z.any()).optional().nullable(),
        client: z.string().optional().nullable(),
        location: z.string().optional().nullable(),
        year: z.string().optional().nullable(),
        area: z.string().optional().nullable(),
        category: z.string().optional().nullable(),
        tags: z.array(z.any()).optional().nullable(),
        featured: z.boolean().optional().nullable(),
        blocks: z.array(z.any()).optional().nullable(),
    }),
});

// Services collection
const servicesCollection = defineCollection({
    loader: glob({ pattern: 'src/content/services/**/*.yaml' }),
    schema: z.object({
        title: z.string(),
        slug: z.string().optional(),
        description: z.string().optional().nullable(),
        icon: z.string().optional().nullable(),
        featuredImage: z.string().optional().nullable(),
        category: z.string().optional().nullable(),
        tags: z.array(z.any()).optional().nullable(),
        order: z.number().optional().nullable(),
        blocks: z.array(z.any()).optional().nullable(),
    }),
});

// Categories collection
const categoriesCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        description: z.string().optional().nullable(),
    }),
});

// Tags collection
const tagsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
    }),
});

export const collections = {
    settings: settingsCollection,
    pages: pagesCollection,
    projects: projectsCollection,
    services: servicesCollection,
    categories: categoriesCollection,
    tags: tagsCollection,
};
