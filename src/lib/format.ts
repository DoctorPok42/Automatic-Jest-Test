const formatTests = (
    tests: any,
) => {
    let formattedTests = [] as any[];

    tests.forEach((test: any) => {
        const { name, result, searchMethod, expected } = test;

        const nameStr = `test(${name}, () => {`;
        const resultStr = `expect(${result}).${searchMethod}(${expected});`;

        const finalStr = `${nameStr}\n\t${resultStr}\n});`;

        formattedTests.push({
            finalStr,
        });
    });

    return formattedTests
};

export default formatTests;
