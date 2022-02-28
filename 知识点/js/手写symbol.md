<!-- 

当调用 Symbol 的时候，会采用以下步骤：

1 如果使用 new ，就报错
2 如果 description 是 undefined，让 descString 为 undefined
3 否则 让 descString 为 ToString(description)
4 如果报错，就返回
5 返回一个新的唯一的 Symbol 值，它的内部属性 [[Description]] 值为 descString
考虑到还需要定义一个 [[Description]] 属性，如果直接返回一个基本类型的值，是无法做到这一点的，所以我们最终还是返回一个对象。

为了防止不会出现同名的属性，毕竟这是一个非常重要的特性，迫不得已，我们需要修改 toString 方法，
让它返回一个唯一值，所以第 8 点就无法实现了，而且我们还需要再写一个用来生成 唯一值的方法，就命名为 generateName，我们将该唯一值添加到返回对象的 __Name__ 属性中保存下来

7.Symbol 值不能与其他类型的值进行运算，会报错。

以 + 操作符为例，当进行隐式类型转换的时候，会先调用对象的 valueOf 方法，如果没有返回基本值，就会再调用 toString 方法，所以我们考虑在 valueOf 方法中进行报错，比如：


10. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。

嗯，无法实现。

11. 有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

这个实现类似于函数记忆，我们建立一个对象，用来储存已经创建的 Symbol 值即可。

12. Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。

遍历 forMap,查找该值对应的键值即可。
-->
<script>
    (function() {
        var root = this;
        var generateName = (function() {
            var postfix = 0;
            return function(descString) {
                postfix++;
                return `@@${descString}_${postfix}`;
            }
        })();

        var forMap = {};
        var SymbolPolyfill = function Symbol(description) {
            if (this instanceof SymbolPolyfill) {
                throw new TypeError("Symbol is not a constructor");
            }

            var descString = description === undefined ? undefined : description;

            var symbol = Object.create({
                toString: function() {
                    return this.__Name__;
                },
                valueOf: function() {
                    throw new Error("Cannot convert a Symbol value");
                }
            });

            Object.defineProperties(symbol, {
                "__Description__": {
                    value: descString,
                    writable: false,
                    enumerable: false,
                    configurable: false
                },

                "__Name__": {
                    value: generateName(descString),
                    writable: false,
                    enumerable: false,
                    configurable: false
                }
            })

            return symbol;
        }

        // Object.defineProperties(SymbolPolyfill, {
        //     'for': {
        //         value: function(description) {
        //             var descString = description === undefined ? undefined : String(description)
        //             return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
        //         },
        //         writable: true,
        //         enumerable: false,
        //         configurable: true
        //     },
        //     'keyFor': {
        //         value: function(symbol) {
        //             for (var key in forMap) {
        //                 if (forMap[key] === symbol) return key;
        //             }
        //         },
        //         writable: true,
        //         enumerable: false,
        //         configurable: true
        //     }
        // })

        root.SymbolPolyfill = SymbolPolyfill;
    })();
    console.log(SymbolPolyfill(1))
    console.log(SymbolPolyfill(1).toString());
    console.log(String(SymbolPolyfill(1)));

    var a = SymbolPolyfill('foo');
    var b = SymbolPolyfill('foo');

    console.log(a === b); // false

    var o = {};
    o[a] = 'hello';
    o[b] = 'hi';

    console.log(o); // Object { "@@foo_1": "hello", "@@foo_2": "hi" }

    console.log('1' + symbol); // 报错
</script>
