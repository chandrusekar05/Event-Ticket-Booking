const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check existing user
    const checkQuery = "SELECT * FROM users WHERE email = ?";

    db.query(checkQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const insertQuery =
        "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)";

      db.query(
        insertQuery,
        [name, email, hashedPassword, role || "student"],
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            success: true,
            message: "User registered successfully",
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


// ================= LOGIN =================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const user = result[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      // JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};