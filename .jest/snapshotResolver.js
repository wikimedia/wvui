module.exports = {
    resolveSnapshotPath( testPath, snapshotExtension ) {
        return testPath.replace( /\.test\.([tj]sx?)/, `${snapshotExtension}.$1` );
    },

    resolveTestPath( snapshotFilePath, snapshotExtension ) {
        return snapshotFilePath.replace( snapshotExtension, '.test' );
    },

    testPathForConsistencyCheck: '<path>/<test subject>.test.ts'
};
