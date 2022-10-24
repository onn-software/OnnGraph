const main = async () => {
    console.log(`main`);
}

main().then(() => console.log(`Done`)).catch(e => console.log('Exit with error', e));
