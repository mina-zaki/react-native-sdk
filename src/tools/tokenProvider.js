/**
 * @private
 * Holds token information
 */
class TokenProvider {
  /**
   * Returns token
   */
  get() {
    return this.token;
  }

  /**
   * Sets token
   * @param {object} token
   */
  set(token) {
    this.token = token;
  }

  /**
   * Clears token
   */
  clear() {
    this.token = undefined;
  }
}

const provider = new TokenProvider();

export default provider;
