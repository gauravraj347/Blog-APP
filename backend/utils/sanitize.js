const sanitizeHtml = require('sanitize-html');

const quillSafeConfig = {
  allowedTags: [
    'b', 'i', 'em', 'strong', 'u', 'a', 'p', 'ul', 'ol', 'li', 'br', 'span',
    'blockquote', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height', 'style'],
    span: ['style'],
    '*': ['style'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
  allowedSchemesByTag: {},
  allowProtocolRelative: true,
  allowedStyles: {
    '*': {
      // Allow only safe inline styles
      'color': [/^.*$/],
      'background-color': [/^.*$/],
      'text-align': [/^left$|^right$|^center$|^justify$/],
      'font-weight': [/^bold$|^normal$|^bolder$|^lighter$|^[0-9]{3}$/],
      'font-size': [/^.*$/],
      'font-family': [/^.*$/],
      'text-decoration': [/^.*$/],
      'padding-left': [/^.*$/],
      'padding-right': [/^.*$/],
      'padding-top': [/^.*$/],
      'padding-bottom': [/^.*$/],
      'margin-left': [/^.*$/],
      'margin-right': [/^.*$/],
      'margin-top': [/^.*$/],
      'margin-bottom': [/^.*$/],
    },
  },
  transformTags: {
    'a': sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
  },
};

module.exports = function(content) {
  return sanitizeHtml(content, quillSafeConfig);
}; 