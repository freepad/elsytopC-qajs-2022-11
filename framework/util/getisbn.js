const parseISBN = (obj) => {
        return Object.entries(obj).filter(([key, value]) => key === 'isbn').flat()
    }

    let getRandomISBN = function (func) {
        let min = 0
        let max = 10
        let index = Math.floor(Math.random() * (max-min));

        return func[index];
    }
