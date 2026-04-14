/**
 * Rasmlar uchun to'liq URL manzilini hosil qiluvchi funksiya
 * @param {Object} req - Express request obyekti
 * @param {string} imagePath - Rasmning bazadagi qisqa yo'li (masalan: 'uploads/image.jpg')
 * @returns {string} - To'liq URL (masalan: 'http://localhost:5000/uploads/image.jpg')
 */
export const getFullPath = (req, imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  const protocol = req.protocol;
  const host = req.get('host');

  return `${protocol}://${host}/${imagePath.replace(/\\/g, '/')}`;
};

module.exports = {
  getFullPath
};