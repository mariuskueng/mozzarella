describe('Lists', function () {
  'use strict';

  beforeEach(function () {
    MeteorStubs.install();
  });

  afterEach(function () {
    MeteorStubs.uninstall();
  });

  describe('getList', function () {
    it('should be created with name', function () {
      spyOn(Lists, 'insert').and.callFake(function(text, callback) {
          callback(1, 'Fleisch');
      });

      expect(true).toBe(true);

      var listId = 1;
      var result = {_id: listId};
      spyOn(Lists, 'findOne').and.returnValue(result);

      expect(Lists.findOne(listId)).toBe(result);
      expect(Lists.findOne.calls.argsFor(0)).toEqual([listId]);

    });
  });
});
