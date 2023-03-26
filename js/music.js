class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return `${this.title} - ${this.singer}`;
    }
}



const musicList = [
    new Music('New Divide', 'Linkin Park', 'linkin_park.jpg', '1.mp3'),
    new Music('Lost in the...', 'Linkin Park', 'linkin_park.jpg', '2.mp3'),
    new Music('Smells Like...', 'Nirvana', 'nrv.jpg', '3.mp3'),
    new Music('Toxicity', 'System of a...', 'soad.jpg', '4.mp3'),
    new Music('Chop Suey', 'System of a...', 'soad.jpg', '5.mp3'),
    new Music('Breaking the...', 'Linkin Park', 'linkin_park.jpg', '6.mp3'),
    new Music('Crawling', 'Linkin Park', 'linkin_park.jpg', '7.mp3'),
]



