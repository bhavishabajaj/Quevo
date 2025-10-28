function showForm(type) {
  document.querySelector('.welcome-screen').style.display = 'none';
  document.querySelector('.applicant-form').classList.remove('active');
  document.querySelector('.recruiter-form').classList.remove('active');
  document.querySelector(`.${type}-form`).classList.add('active');
}

function goBack() {
  document.querySelector('.applicant-form').classList.remove('active');
  document.querySelector('.recruiter-form').classList.remove('active');
  document.querySelector('.welcome-screen').style.display = 'flex';
}

function switchToRecruiter() {
  document.querySelector('.applicant-form').classList.remove('active');
  document.querySelector('.recruiter-form').classList.add('active');
}

function switchToApplicant() {
  document.querySelector('.recruiter-form').classList.remove('active');
  document.querySelector('.applicant-form').classList.add('active');
}
