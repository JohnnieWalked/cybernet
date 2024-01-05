const paths = {
  loginPage() {
    return '/';
  },

  userHomePage(usernameSlug: string) {
    return `/${usernameSlug}`;
  },
};

export default paths;
