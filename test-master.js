(function(){

    QUnit.test( "Our First Test", function( assert ) {
      var value = "hello tests";
      var some_number = 484;
  
      //                     ┌ Change this to what it should be
      assert.equal( value, value);
      //                           ┌ Change this to what it should be
      assert.equal( some_number, some_number);
    });
  
    QUnit.test("Functions can access/modify variables in parent scope.", function(assert){
      var outside_the_function = null;

      function yay(){
        var inside_the_function = "can you see me?";
        outside_the_function = inside_the_function; 
      }
  
      yay();
  
      assert.equal(outside_the_function, "can you see me?");
    });
  
    QUnit.test("Function Parameters become scoped to the function.", function(assert){
  
      function yay(param){
        assert.equal(param, "a fine kettle of fish");
      }
  
      yay("a fine kettle of fish");
    });
  
    QUnit.test("A functions local scope is not available in an outer scope.", function(assert){
      function yay(){
        var kix = "kid tested mother approved";
        assert.equal(kix, "kid tested mother approved");
      }
      yay();
      
      var has_kix;
      // NOTE:
      // "this" is a special object that by default represents the global scope.
      // variables declared globally are stored as a property on the object: this.<variable>
      // if the variable is not global then this.<variable> will be undefined
      if(this.kix !== undefined){
        has_kix = kix;
      } else {
        has_kix = "i prefer cheerios";
      }
      assert.equal(has_kix, "i prefer cheerios");
    });
  
    QUnit.test("Functions don't have access to each others scope", function(assert){
      function yay(){
        var from_yay = "i'm inside yay;";
      }
  
      function foo(){
        var in_foo = "i'm in foo";
        if(this.from_yay !== undefined){
          in_foo = this.from_yay;
        }
        // NOTE: in_foo 's value is "i'm in foo" bc in_foo is initialized w/ "im in foo" 
        // + when yay() is invoked, from_yay's value is function scope -> this.from_yay = undefined
        assert.equal(in_foo, "i'm in foo");
        assert.equal(this.from_yay, undefined);
      }
      yay();
      foo();
    });
  
    QUnit.test("Inner scope variables override outer scope variables.", function(assert){
  
      var peanuts = 300;
  
      function yay(){
        var peanuts = "roasted";
  
        // NOTE: variables initialized in the inner scope take precedence over variables in the outer scope
        assert.equal(peanuts, "roasted");
      }
      yay();
  
      assert.equal(peanuts, 300);
    });
  
    QUnit.test("Variables created with var in a function are re-created each time", function(assert){
      // var scope = "is this global?";
      
      function yay() {
        // console.log('inner this', this.counter); // -> global window
        if(this.counter !== undefined){
          counter = counter + 1;
        } else {
          // NOTE: this will always be function scoped + have no effect on global [this]
          var counter = 10;
        }
      }
      
      // console.log('outer this', this); // -> {}

      yay();
      assert.equal(this.counter, undefined);
      yay();
      assert.equal(this.counter, undefined);
      yay();
      assert.equal(this.counter, undefined);
    });
  
    QUnit.test("Inner scope can access outer scope", function(assert){
      var im_outside = "alpha";
      function yay(){
        var im_inside = "omega";
        return im_outside + im_inside;
      }
  
      assert.equal(yay(), "alphaomega");
    });
  
    QUnit.test("Functions retain outer scope references between calls.", function(assert){
      var im_outside = 13;
      function yay(){
        im_outside += 1;
      }
  
      yay();
      assert.equal(im_outside, 14);
      yay();
      assert.equal(im_outside, 15);
    });
  
    QUnit.test("We can do goofy stuff with outer scope", function(assert){
  
      var hello = "greg";
      var name = "";
  
      function yay(){
        name += hello;
      }
  
      yay();
      assert.equal(name, "greg");
      yay();
      assert.equal(name, "greggreg");
      yay();
      assert.equal(name, "greggreggreg");
    });
  
    QUnit.test("We can pass functions to other functions and then run them.", function(assert){
      var im_outer = 10;
      function yay(){
        im_outer /= 5;
      }
      function something(whatever){
        im_outer *= 20;
        whatever();
      }
      something(yay);
      assert.equal(im_outer, 40);
  
    });
  
    QUnit.test("We can get crazy with returns.", function(assert){
      function yay(){
        return " is dog";
      }
      function foo(whatever){
        return "hello, this" + whatever();
      }
      assert.equal(foo(yay), "hello, this is dog");
    });
  
  })();