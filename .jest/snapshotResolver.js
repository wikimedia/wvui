module.exports = {
    resolveSnapshotPath( testPath, snapshotExtension ) {
        return testPath.replace( /\.test\.([tj]s?)/, `${snapshotExtension}.$1` );
    },

    resolveTestPath( snapshotPath, snapshotExtension ) {
        return snapshotPath.replace( snapshotExtension, '.test' );
    },

    testPathForConsistencyCheck: '<path>/<test subject>.test.ts'
};
