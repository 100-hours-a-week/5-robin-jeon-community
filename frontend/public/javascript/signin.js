

function signin_sendit() {
    let form = document.getElementById("signin_Form");
    let email = form.email.value;
    let pwd = form.password.value;
    let pwd_chk = form.password_chk.value;
    let nickname = form.nickname.value;
    const h_email = document.getElementById("helper_email");
    const profile_img = document.getElementById("profile").value;
    
    if (profile_img == "") {
      console.log("프로필업로드");
    }
    console.log(profile_img);
    const name_chk = checkNickName(nickname);
    console.log(name_chk);
    console.log(nickname);
    if (!checkEmail(email)) {
      alert("올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)");
      return false;
    } else if ("aa@example.com" === email) {
      //FIXME: 중복 이메일 검사 부분
      alert("중복된 이메일 입니다.");
      return false;
    } else if (!checkPwd(pwd)) {
      alert(
        "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.",
      );
      return false;
    } else if (pwd !== pwd_chk) {
      alert("비밀번호가 다릅니다.");
      return false;
    } else if (name_chk < 6) {
      if (name_chk == 1) {
        alert("띄어쓰기 불가, 10글자 이내");
        return false;
      } else if (name_chk == 2) {
        alert("닉네임을 입력해주세요");
        return false;
      } else if (name_chk == 3) {
        alert("띄어쓰기를 없애주세요");
        return false;
      } else if (name_chk == 4) {
        alert("중복된 닉네임입니다.");
        return false;
      } else if (name_chk == 5) {
        alert("닉네임은 최대 10자 까지 작성 가능합니다.");
        return false;
      }
    } else if (profile_img == "") {
      alert("프로필 사진을 추가해주세요");
      return false;
    } else {
        /* 프로필 이미지 넘기기 */
        const file = document.getElementById('profile').files[0];
        const formData = new FormData();
        formData.append('image', file);
        fetch('http://localhost:3065/users/upload/profile-image', {
            method: 'POST',
            body: formData
        })
        .then(response => console.log(response));
        form.submit();
    }
  }


  function checkEmail(email) {
    const pattern = /^[A-Za-z\.\-]+@[A-Za-z\-]+\.[A-za-z\-]+/;
    if (email.length < 7 || email == null || !pattern.test(email)) {
      return false;
    } else {
      return true;
    }
  }
  function checkPwd(pwd) {
    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!pattern.test(pwd)) {
      return false;
    } else {
      return true;
    }
  }
  function checkNickName(nickname) {
    //NOTE: 1:유효성 2:입력x 3:띄어쓰기 4:중복 5:11자이상 6:통과
    const pattern = /\s/g;
    if (pattern.test(nickname) && nickname.length > 10) {
      return 1;
    } else if (nickname === "") {
      return 2;
    } else if (pattern.test(nickname)) {
      return 3;
    } else if ("admin" === nickname) {
      //FIXME: 중복 닉네임
      return 4;
    } else if (nickname.length > 10) {
      return 5;
    } else {
      return 6;
    }
  }
  function checkProfile() {
    const preview = document.getElementById("preview");
    const profile_img = document.getElementById("profile").files[0];
    const noprofile = document.getElementById("noprofile_img");
    if (profile_img) {
      const reader = new FileReader();
      noprofile.style.display = "none";
      preview.style.display = "block";
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(profile_img);
    }
  }
  document.getElementById('profile').addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    console.log('bb');
    if(selectedFile) {
      console.log('aa');
      document.getElementById('helper_profile').style.display = 'none';
    }
  });
  document.getElementById('email').addEventListener('input', () => {
    const evalue = document.getElementById('email');
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const h_email = document.getElementById('helper_email');
    if(evalue.value ==='') {
      h_email.textContent = '이메일을 입룍해주세요';
    } else if(!pattern.test(evalue.value) || evalue.value.length < 7) {
      h_email.textContent = '올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
    } else if(evalue.value === 'example@example.com') {
      h_email.textContent = '중복된 이메일입니다.';
    } else {
      console.log('btn1');
      h_email.textContent = '사용가능한 이메일입니다.';
    }
  });
  document.getElementById('password').addEventListener('input', () => {
    const evalue = document.getElementById('password');
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const h_pwd = document.getElementById('helper_pwd');
    if(evalue.value ==='') {
      h_pwd.textContent = '비밀번호를 입력해주세요';
    } else if(!pattern.test(evalue.value)) {
      h_pwd.textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
    } else {
      console.log('btn1');
      h_pwd.textContent = '사용가능한 비밀번호입니다.';
    }
  });
  document.getElementById('password_chk').addEventListener('input', () => {
    const evalue = document.getElementById('password_chk');
    const h_pwd = document.getElementById('helper_pwd_chk');
    const evalue_chk = document.getElementById('password');
    console.log(evalue.value);
      console.log(evalue_chk.value);
    if(evalue.value ==='') {
      h_pwd.textContent = '비밀번호를 입력해주세요';
    } else if(evalue.value != evalue_chk.value) {
      h_pwd.textContent = '비밀번호가 다릅니다.';
    } else {
      console.log('btn1');
      h_pwd.textContent = '사용가능한 비밀번호입니다.';
    }
  });
  document.getElementById('nickname').addEventListener('input', () => {
    const evalue = document.getElementById('nickname');
    const h_pwd = document.getElementById('helper_nickname');
    const pattern = /\s/g;
    console.log(evalue.value);
    if(evalue.value ==='') {
      h_pwd.textContent = '닉네임을 입력해주세요';
    } else if(pattern.test(evalue.value)) {
      h_pwd.textContent = '띄어쓰기를 없애주세요.';
    } else if(evalue.value === 'robin') {
      h_pwd.textContent = '중복된 닉네임 입니다.';
    }else if(evalue.value.length > 10) {
      h_pwd.textContent = '닉네임은 최대 10자까지 가능합니다.';
    } else {
      console.log('btn1');
      h_pwd.textContent = '사용가능한 닉네임입니다.';
    }
  });

  function imgInput() {
    document.getElementById("img-input").addEventListener("click", () => {
    document.getElementById("profile").click();
    });
  }