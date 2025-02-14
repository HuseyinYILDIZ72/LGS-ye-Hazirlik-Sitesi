document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'LGS7211') {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        loadFiles();
    } else {
        alert('Yanlış şifre!');
    }
});

document.getElementById('logout').addEventListener('click', function() {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('password').value = '';
});

function uploadFile(subject) {
    const fileInput = document.getElementById(`${subject}-file`);
    const topicInput = document.getElementById(`${subject}-topic`);
    const videoInput = document.getElementById(`${subject}-video`);
    const fileList = document.getElementById(`${subject}-list`);
    const file = fileInput.files[0];
    const topic = topicInput.value;
    const video = videoInput.value;

    if (file && topic && video) {
        const li = document.createElement('li');

        const div = document.createElement('div');

        const span = document.createElement('span');
        span.textContent = `${topic}`;
        div.appendChild(span);

        const videoLink = document.createElement('a');
        videoLink.href = video;
        videoLink.target = '_blank';
        videoLink.textContent = 'Video';
        div.appendChild(videoLink);

        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.textContent = 'Dosya';
        div.appendChild(link);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveFiles();
        });
        div.appendChild(deleteButton);

        li.appendChild(div);
        fileList.appendChild(li);

        saveFiles();

        fileInput.value = '';
        topicInput.value = '';
        videoInput.value = '';
    } else {
        alert('Lütfen tüm alanları doldurunuz.');
    }
}

function saveFiles() {
    const lists = document.querySelectorAll('.file-list');
    const data = {};

    lists.forEach(list => {
        const id = list.id.replace('-list', '');
        data[id] = [];

        list.querySelectorAll('li').forEach(item => {
            const topic = item.querySelector('span').textContent;
            const video = item.querySelector('a:nth-child(2)').href;
            const file = item.querySelector('a:nth-child(3)').download;

            data[id].push({ topic, video, file });
        });
    });

    localStorage.setItem('files', JSON.stringify(data));
}

function loadFiles() {
    const data = JSON.parse(localStorage.getItem('files'));
    if (!data) return;

    for (const subject in data) {
        const list = document.getElementById(`${subject}-list`);
        data[subject].forEach(item => {
            const li = document.createElement('li');

            const div = document.createElement('div');

            const span = document.createElement('span');
            span.textContent = item.topic;
            div.appendChild(span);

            const videoLink = document.createElement('a');
            videoLink.href = item.video;
            videoLink.target = '_blank';
            videoLink.textContent = 'Video';
            div.appendChild(videoLink);

            const link = document.createElement('a');
            link.href = '#';
            link.download = item.file;
            link.textContent = 'Dosya';
            div.appendChild(link);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.addEventListener('click', function() {
                li.remove();
                saveFiles();
            });
            div.appendChild(deleteButton);

            li.appendChild(div);
            list.appendChild(li);
        });
    }
}