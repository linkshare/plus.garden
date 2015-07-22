describe('services/DbProvider', function () {

    var DbProvider = bee.use('services/DbProvider');

    it('should allow to get single instance of DB', sinon.test(function () {

        var provider = new DbProvider({}, {});
        var db = {};

        this.stub(provider, '_connect', function (name) {
            name.should.equal('db_name');
            return  db;
        });

        var myDb = provider.get('db_name');

        myDb.should.equal(db);
        myDb.should.not.equal({});

        var myExistDb = provider.get('db_name');
        myExistDb.should.equal(myDb);

    }));

    it('should allow to close db by name', sinon.test(function () {

        var provider = new DbProvider({}, {});
        var db = {close: this.spy()};
        var db2 = {};

        this.stub(provider, '_connect')
            .onCall(0).returns(db)
            .onCall(1).returns(db2);

        provider.get('db_name').should.equal(db);
        provider.close('db_name');


        db.close.calledOnce.should.be.ok;

        provider.get('db_name').should.not.equal(db);

        provider.get('db_name').should.equal(db2);
        provider.get('db_name').should.equal(db2);
    }));

});
