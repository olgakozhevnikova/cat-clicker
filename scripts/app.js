window.onload = () => {
    class Cat {
        constructor(name, image, clicks) {
            this.name = name;
            this.image = image;
            this.clicks = clicks;
        }
    }

    const cats = [
        new Cat('Murzik', './img/cat-1.jpg', 0),
        new Cat('Filya', './img/cat-2.jpg', 0),
        new Cat('Barsik', './img/cat-3.jpg', 0),
        new Cat('Timka', './img/cat-4.jpg', 0),
        new Cat('Vasya', './img/cat-5.jpg', 0)
    ];
    
    cats.forEach(cat => {
        const listItem = document.createElement("LI");
        var textnode = document.createTextNode(cat.name);
        listItem.appendChild(textnode);
        document.getElementById('cats-list').appendChild(listItem);
        
        listItem.addEventListener('click', () => {
            cat.clicks++;
            document.getElementById('name').innerHTML = cat.name;
            document.getElementById('clicks').innerHTML = 'Number of clicks: ' + cat.clicks;
            const img = document.createElement("img");
            img.src = cat.image;
            document.getElementById("clicks").appendChild(img);
        }, false);
    });
}
