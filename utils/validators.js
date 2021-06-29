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

module.exports.ValidateProductInput = (name, image, price, quantity, unit) => {
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
  if (unit.trim() === "") {
    errors.unit = "Đơn vị bán của sản phẩm phải là số";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.ValidateProfile = (address, phoneNumber, fullName) => {
  var errors = {};
  var check = address.split(",");
  console.log(check);
  if (check[0] === "") {
    errors.city = "Vui lòng chọn Tỉnh/Thành phố";
  } else if (check[1] === undefined) {
    errors.district = "Vui lòng chọn Quận/Huyện";
  } else if (check[2] === undefined) {
    errors.ward = "Vui lòng chọn Phường/Xã";
  }
  if (phoneNumber.trim() === "") {
    errors.phoneNumber = "Vui lòng nhập số điện thoại nhận hàng";
  } else if (
    !parseInt(phoneNumber) ||
    phoneNumber.length < 10 ||
    phoneNumber.length > 11
  ) {
    errors.phoneNumber = "Số điện thoại không hợp lệ";
  }
  if (fullName.trim() === "") {
    errors.fullName = "Vui lòng nhập tên người nhận";
  } else if (fullName.length < 7) {
    errors.fullName = "Vui lòng nhập đầy đủ họ tên";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
