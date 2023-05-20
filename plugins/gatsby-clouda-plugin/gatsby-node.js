/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
'use strict'
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.sourceNodes = void 0
/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = function () {
  return console.log('__Loaded gatsby-starter-plugin__')
}
var CUSTOM_TEAM_MEMBER_TYPE = 'TeamMember'
// type CustomPost = {
//   id: number;
//   description: string;
// };
var sourceNodes = function (_a) {
  var actions = _a.actions,
    createNodeId = _a.createNodeId,
    createContentDigest = _a.createContentDigest
  return __awaiter(void 0, void 0, void 0, function () {
    var createNode, data
    return __generator(this, function (_b) {
      createNode = actions.createNode
      data = {
        teamData: [
          {
            id: 1,
            firstName: 'Name 1',
            lastName: 'last 1',
            description:
              'Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.',
          },
          {
            id: 2,
            firstName: 'Name 2',
            lastName: 'last 2',
            description:
              'Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.',
          },
          {
            id: 3,
            firstName: 'Name 3',
            lastName: 'last 3',
            description:
              'Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.',
          },
          {
            id: 4,
            firstName: 'Name 4',
            lastName: 'last 4',
            description:
              'Elit non veniam pariatur sunt voluptate excepteur mollit cillum excepteur magna eiusmod sint duis. Culpa adipisicing cupidatat magna non. Officia aute veniam culpa magna labore nostrud commodo dolor ullamco est enim dolor nulla. Labore quis exercitation eiusmod labore esse excepteur incididunt id. Ut cupidatat mollit pariatur nulla qui anim enim irure labore et nulla aute. Magna incididunt pariatur veniam adipisicing mollit mollit exercitation est minim voluptate amet.',
          },
        ],
      }
      // loop through data and create Gatsby nodes
      data.teamData.forEach(function (member) {
        return createNode(
          __assign(__assign({}, member), {
            id: createNodeId(
              ''.concat(CUSTOM_TEAM_MEMBER_TYPE, '-').concat(member.id)
            ),
            parent: null,
            children: [],
            internal: {
              type: CUSTOM_TEAM_MEMBER_TYPE,
              content: JSON.stringify(member),
              contentDigest: createContentDigest(member),
            },
          })
        )
      })
      return [2 /*return*/]
    })
  })
}
exports.sourceNodes = sourceNodes
//# sourceMappingURL=gatsby-node.js.map
