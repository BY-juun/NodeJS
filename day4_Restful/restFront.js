async function getUser() { // 로딩 시 사용자 가져오는 함수
    try {
      const res = await axios.get('/users');
      const users = res.data;
      const list = document.getElementById('list');
      list.innerHTML = '';
      // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
      Object.keys(users).map(function (key) {
        const userDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = users[key];
        const edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', async () => { // 수정 버튼 클릭
          const name = prompt('바꿀 이름을 입력하세요');
          if (!name) {
            return alert('이름을 반드시 입력하셔야 합니다');
          }
          try {
            await axios.put('/user/' + key, { name });
            getUser();
          } catch (err) {
            console.error(err);
          }
        });
        const remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', async () => { // 삭제 버튼 클릭
          try {
            await axios.delete('/user/' + key);
            getUser();
          } catch (err) {
            console.error(err);
          }
        });
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove);
        list.appendChild(userDiv);
        console.log(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  async function getTable() { // 로딩 시 사용자 가져오는 함수
    try {
      const res = await axios.get('/table');
      const table = res.data;
      const list = document.getElementById('list');
      list.innerHTML = '';
      // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
      Object.keys(table).map(function (key) {
        const tableDiv = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = table[key];
        const edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', async () => { // 수정 버튼 클릭
          const name = prompt('제목을 수정할지, 내용을 수정할지 입력해주세요');
          if(name === '제목')
          {
            const title = prompt('바꿀 제목을 입력해주세요'); 
            try {
                await axios.put('/table/' + key, { title });
                getTable();
              } catch (err) {
                console.error(err);
            }
          }
          else if(name === '내용')
          {
            const content = prompt('바꿀 제목을 입력해주세요'); 
            try {
                await axios.put('/table/' + key, { content });
                getTable();
              } catch (err) {
                console.error(err);
            }
          }
          else if (!name) {
            return alert('이름을 반드시 입력하셔야 합니다');
          }
          
        });
        const remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', async () => { // 삭제 버튼 클릭
          try {
            await axios.delete('/table/' + key);
            getTable();
          } catch (err) {
            console.error(err);
          }
        });
        tableDiv.appendChild(span);
        tableDiv.appendChild(edit);
        tableDiv.appendChild(remove);
        list.appendChild(userDiv);
        console.log(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  window.onload = getUser; // 화면 로딩 시 getUser 호출
  window.onload = getTable;
  // 폼 제출(submit) 시 실행
  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
      return alert('이름을 입력하세요');
    }
    try {
      await axios.post('/user', { name });
      getUser();
    } catch (err) {
      console.error(err);
    }
    e.target.username.value = '';
  });

  document.getElementById('form2').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.tablename.value;
    const content = e.target.tablecontent.value;
    if (!name || !content) {
      return alert('입력하세요');
    }
    try {
      await axios.post('/table', { name , content });
      getTable();
    } catch (err) {
      console.error(err);
    }
    e.target.tablename.value = '';
    e.target.tablecontent.value = '';
  });