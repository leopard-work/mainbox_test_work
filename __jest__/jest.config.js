export default {
  roots: ["<rootDir>/../src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Modules are meant for code which is repeating in each test file
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/../filesMock.js",
    "assets/(.*)": "<rootDir>/../src/assets/$1",
    "modules/(.*)": "<rootDir>/../src/modules/$1",
    "shared/(.*)": "<rootDir>/../src/shared/$1",
    "views/(.*)": "<rootDir>/../src/views/$1",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
  testMatch: ["**/?(*.)(spec|test).[jt]s?(x)"], // Finds test files named like abc.test|spec.ts?tsx|js|jsx in roots:[] prop.
  testEnvironment: "jsdom", // To avoid of js DOM errors
};
