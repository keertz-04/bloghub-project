const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateBlogInput = (title, content, author) => {
  const errors = [];

  if (!title || title.trim().length < 5) {
    errors.push("Title must be at least 5 characters");
  }

  if (!content || content.trim().length < 20) {
    errors.push("Content must be at least 20 characters");
  }

  if (!author || author.trim().length < 2) {
    errors.push("Author name must be at least 2 characters");
  }

  return errors;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateBlogInput
};
