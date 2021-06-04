module.exports.ValidateRegisterInput = (
  usernameData,
  username,
  password,
  email,
  confirmPassword
) => {
  var errors = [];
  if (username.trim() === "") {
    var err = {};
    (err.field = "username"),
      (err.message = "Tên đăng nhập không được để trống");
    errors.push(err);
  } else if (username.length < 5) {
    var err = {};
    (err.field = "username"),
      (err.message = "Tên đăng nhập không được nhỏ hơn 5 ký tự");
    errors.push(err);
  } else if (usernameData === username) {
    var err = {};
    (err.field = "username"),
      (err.message = "Tên người dùng này đã được sử dụng");
    errors.push(err);
  }
  if (password.trim() === "") {
    var err = {};
    (err.field = "password"), (err.message = "Mật khẩu không được để trống");
    errors.push(err);
  } else if (password.length < 5) {
    var err = {};
    (err.field = "password"),
      (err.message = "Mật khẩu không được nhỏ hơn 5 ký tự");
    errors.push(err);
  } else if (password.trim() !== confirmPassword.trim()) {
    var err = {};
    (err.field = "comfirmPassword"), (err.message = "mật khẩu phải trùng khớp");
    errors.push(err);
  }
  if (email.trim() === "") {
    var err = {};
    (err.field = "email"), (err.message = "Email không được để trống");
    errors.push(err);
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      var err = {};
      (err.field = "email"),
        (err.message = "Email phải là một địa chỉ email hợp lệ");
      errors.push(err);
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.ValidateLoginInput = (
  username,
  password,
) => {
  var errors = [];
  if (username.trim() === "") {
    var err = {};
    (err.field = "username"),
      (err.message = "Tên đăng nhập không được để trống");
    errors.push(err);
  } 
  if (password.trim() === "") {
    var err = {};
    (err.field = "password"), (err.message = "Mật khẩu không được để trống");
    errors.push(err);
  } 
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
