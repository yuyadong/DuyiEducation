let user = {
  name: "于亚东",
  birth: "1985-02-19",
};

// 显示姓氏
function showFirstName() {
  document.querySelector(".firstname").textContent = "姓氏：" + user.name[0];
}

// 显示名字
function showLaststName() {
  document.querySelector(".lastname").textContent =
    "名字：" + user.name.substring(1);
}

// 显示生日
function showBirth() {
  document.querySelector(".age").textContent = "生日：" + user.birth;
}
observe(user);
autorun(showFirstName);
autorun(showLaststName);
autorun(showBirth);
