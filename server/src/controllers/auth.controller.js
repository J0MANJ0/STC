export const signup = async (req, res) => {
  try {
    res.json('signup');
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  try {
    res.json('login');
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const logout = async (req, res) => {
  try {
    res.json('logout');
  } catch (error) {
    res.status(500).json({ error });
  }
};
