document.addEventListener('DOMContentLoaded', function () {
    const blogForm = document.getElementById('blogForm');
    const postsContainer = document.getElementById('posts');

    // Local Storage'dan blog yazılarını yükle
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Blog yazılarını görüntüle
    function displayPosts() {
        postsContainer.innerHTML = '';
        blogPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <div class="date">${post.date}</div>
                <p>${post.content}</p>
                <button onclick="deletePost(${index})">Sil</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Yeni blog yazısı ekle
    blogForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('blogTitle').value;
        const content = document.getElementById('blogContent').value;
        const date = new Date().toLocaleDateString('tr-TR');

        const newPost = {
            title: title,
            content: content,
            date: date
        };

        blogPosts.unshift(newPost); // Yeni yazıyı başa ekle
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

        // Formu temizle
        blogForm.reset();

        // Yazıları yeniden görüntüle
        displayPosts();
    });

    // Blog yazısı silme fonksiyonu
    window.deletePost = function (index) {
        if (confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
            blogPosts.splice(index, 1);
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
            displayPosts();
        }
    }

    // Sayfa yüklendiğinde mevcut yazıları görüntüle
    displayPosts();
});
