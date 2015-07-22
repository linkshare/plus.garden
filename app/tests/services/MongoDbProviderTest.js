describe('services/MongoDbProvider.js', function () {
    var MongoDbProvider = bee.use('services/MongoDbProvider.js');

    var config, logger, MongoClient, wait;

    beforeEach(function () {
        config = {get: function () {}};
        logger = {info: function () {}, error: function () {}};
        MongoClient = {connect: function () {}};
        wait = {for: function (fn) { return fn.apply(this, arguments);}};
    });

    function newProvider() {

        var provider = new MongoDbProvider(config, logger);

        provider.MongoClient = MongoClient;
        provider.wait = wait;

        return provider;
    }

    it('should allow to get single instance of mongodb by name', sinon.test(function () {

        var provider = newProvider();

        var db = {};

        var mongoDbUrl = 'mongo_url';

        this.stub(config, 'get').withArgs('dbName').returns(mongoDbUrl);
        
        this.stub(MongoClient, 'connect',function (wait, url) {
            url.should.equal(mongoDbUrl);
            return db;
        });

        var myDb = provider.get('dbName');
        db.should.equal(myDb);

        var myDb2 = provider.get('dbName');
        db.should.equal(myDb2);

    }))

})