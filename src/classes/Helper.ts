const Helper = {
    String: {
        /**
         * Метод добавляет ведущий ноль
         * @param value
         */
        padNullStart(value: number): string {
            const str: string = value.toString();
            return str.length < 2 ? '0' + str : str;
        },
    },
};

export default Helper;
