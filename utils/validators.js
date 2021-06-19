module.exports.ValidateRegisterInput = (
  usernameData,
  username,
  password,
  email,
  confirmPassword
) => {
  var errors = {};
  if (username.trim() === "") {
    errors.username = "Tên đăng nhập không được để trống";
  } else if (username.length < 5) {
    errors.username = "Tên đăng nhập không được nhỏ hơn 5 ký tự";
  } else if (usernameData === username) {
    errors.username = "Tên người dùng này đã được sử dụng";
  }
  if (password.trim() === "") {
    errors.password = "Mật khẩu không được để trống";
  } else if (password.length < 5) {
    errors.password = "Mật khẩu không được nhỏ hơn 5 ký tự";
  } else if (password.trim() !== confirmPassword.trim()) {
    errors.comfirmPassword = "mật khẩu phải trùng khớp";
  }
  if (email.trim() === "") {
    errors.email = "Email không được để trống";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email phải là một địa chỉ email hợp lệ";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.ValidateLoginInput = (username, password) => {
  var errors = {};
  if (username.trim() === "") {
    errors.username = "Tên đăng nhập không được để trống";
  }
  if (password.trim() === "") {
    errors.password = "Mật khẩu không được để trống";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.ValidateProductInput = (name, image, price, quantity, uint) => {
  var errors = {};
  if (name.trim() === "") {
    errors.name = "Tên sản phẩm không được để trống";
  } else if (name.length < 10) {
    errors.name = "Tên sản phẩm không được nhỏ hơn 10 ký tự";
  }
  if (image.length < 1) {
    errors.image = "Chọn hình cho sản phẩm";
  }
  if (!parseInt(price)) {
    errors.price = "Giá sản phẩm phải là số";
  } else if (parseInt(price) < 0) {
    errors.price = "Giá sản phẩm không được bé hơn 0";
  }
  if (!parseInt(quantity)) {
    errors.quantity = "Số lượng sản phẩm phải là số";
  } else if (parseInt(quantity) < 0) {
    errors.quantity = "Số lượng sản phẩm không được bé hơn 0";
  }
  if (uint.trim() === "") {
    errors.uint = "Đơn vị bán của sản phẩm phải là số";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
