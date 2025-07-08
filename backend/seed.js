const mongoose = require('mongoose');
const dbConnect = require('./utils/db');
const Post = require('./models/Post');
const slugify = require('./utils/slugify');

async function seed() {
  await dbConnect();
  await Post.deleteMany({}); // Clear existing posts

  const demoPosts = [
    {
      title: 'Welcome to the Demo Blog',
      content: '<p>This is a <strong>demo</strong> post for your blog project. Enjoy editing and creating new posts!</p>',
      slug: slugify('Welcome to the Demo Blog'),
    },
    {
      title: 'Second Post: Features',
      content: '<p>Check out the <em>rich text</em> editor, SEO-friendly URLs, and MongoDB integration.</p>',
      slug: slugify('Second Post: Features'),
    },
    {
      title: 'Tips & Tricks',
      content: '<ul><li>Use the admin dashboard to manage posts.</li><li>Try editing or deleting a post.</li></ul>',
      slug: slugify('Tips & Tricks'),
    },
    {
      title: 'Getting Started with Blogging',
      content: '<p>Start your blogging journey with our easy-to-use platform. Write, edit, and share your thoughts!</p>',
      slug: slugify('Getting Started with Blogging'),
    },
    {
      title: 'Markdown vs Rich Text',
      content: '<p>Explore the differences between <strong>Markdown</strong> and <strong>Rich Text</strong> editors for content creation.</p>',
      slug: slugify('Markdown vs Rich Text'),
    },
    {
      title: 'SEO Best Practices',
      content: '<p>Learn how to optimize your blog posts for search engines with meta tags, slugs, and more.</p>',
      slug: slugify('SEO Best Practices'),
    },
    {
      title: 'MongoDB Integration Guide',
      content: '<p>Step-by-step guide to integrating MongoDB with your Node.js backend for scalable data storage.</p>',
      slug: slugify('MongoDB Integration Guide'),
    },
    {
      title: 'Admin Dashboard Overview',
      content: '<p>Manage your blog posts efficiently with the built-in admin dashboard. Create, edit, and delete posts with ease.</p>',
      slug: slugify('Admin Dashboard Overview'),
    },
  ];

  await Post.insertMany(demoPosts);
  console.log('Demo posts seeded!');
  mongoose.connection.close();
}

seed().catch(err => {
  console.error(err);
  mongoose.connection.close();
}); 