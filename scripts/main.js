function main() {
    loadJSON((response) => {
        injectDataInDocument(response);
        implementNavigation();
    });
}

main();