const chunkData = (array, size) => {
    if (array) {
        let buffer = [];
        return array.reduce((acc, item, i) => {
            let isLast = i === array.length - 1;
            if (buffer.length === size) {
                let theChunk = [...buffer];
                buffer = [item];
                return [...acc, theChunk];
            } else {
                buffer.push(item);
                if (isLast) {
                    return [...acc, buffer];
                } else {
                    return acc;
                }
            }
        }, []);
    }
}
export default chunkData;