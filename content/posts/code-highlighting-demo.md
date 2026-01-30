---
title: "代码高亮展示"
date: 2024-01-20T14:30:00+08:00
draft: false
tags: ["代码示例", "语法高亮", "编程"]
categories: ["技术"]
---

Hugo 内置了强大的代码高亮功能，支持多种编程语言。下面是一些代码示例展示。

## JavaScript / TypeScript

### 异步函数示例

```javascript
// 使用 async/await 处理异步操作
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email
    };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// 使用示例
const user = await fetchUserData(123);
console.log(user);
```

### React 组件示例

```tsx
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user?.name}</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default UserProfile;
```

## Python

### 数据处理示例

```python
import pandas as pd
import matplotlib.pyplot as plt
from typing import List, Dict

class DataAnalyzer:
    """数据分析类"""

    def __init__(self, data_path: str):
        self.data = pd.read_csv(data_path)
        self.summary = {}

    def clean_data(self) -> None:
        """清洗数据"""
        # 删除缺失值
        self.data = self.data.dropna()

        # 转换日期格式
        self.data['date'] = pd.to_datetime(self.data['date'])

        # 去除重复项
        self.data = self.data.drop_duplicates()

    def calculate_statistics(self) -> Dict[str, float]:
        """计算统计数据"""
        numeric_cols = self.data.select_dtypes(include=['number']).columns

        for col in numeric_cols:
            self.summary[col] = {
                'mean': self.data[col].mean(),
                'median': self.data[col].median(),
                'std': self.data[col].std()
            }

        return self.summary

    def visualize_trends(self, column: str) -> None:
        """可视化趋势"""
        plt.figure(figsize=(12, 6))
        plt.plot(self.data['date'], self.data[column])
        plt.title(f'{column} Trend Over Time')
        plt.xlabel('Date')
        plt.ylabel(column)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

# 使用示例
analyzer = DataAnalyzer('sales_data.csv')
analyzer.clean_data()
stats = analyzer.calculate_statistics()
print(stats)
analyzer.visualize_trends('revenue')
```

## Go

### Web 服务器示例

```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sync"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var (
    users = make(map[int]User)
    mu    sync.RWMutex
    nextID = 1
)

func main() {
    http.HandleFunc("/users", usersHandler)
    http.HandleFunc("/users/", userHandler)

    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case "GET":
        listUsers(w, r)
    case "POST":
        createUser(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case "GET":
        getUser(w, r)
    case "DELETE":
        deleteUser(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func listUsers(w http.ResponseWriter, r *http.Request) {
    mu.RLock()
    defer mu.RUnlock()

    userList := make([]User, 0, len(users))
    for _, user := range users {
        userList = append(userList, user)
    }

    json.NewEncoder(w).Encode(userList)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    mu.Lock()
    user.ID = nextID
    users[user.ID] = user
    nextID++
    mu.Unlock()

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}
```

## Rust

### 基本语法示例

```rust
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Product {
    id: u32,
    name: String,
    price: f64,
}

impl Product {
    fn new(id: u32, name: &str, price: f64) -> Self {
        Product {
            id,
            name: name.to_string(),
            price,
        }
    }

    fn with_discount(&self, discount: f64) -> f64 {
        self.price * (1.0 - discount)
    }
}

fn main() {
    // 创建产品列表
    let mut products = vec![
        Product::new(1, "Laptop", 999.99),
        Product::new(2, "Mouse", 29.99),
        Product::new(3, "Keyboard", 79.99),
    ];

    // 添加新产品
    products.push(Product::new(4, "Monitor", 299.99));

    // 过滤和映射
    let expensive_products: Vec<&Product> = products
        .iter()
        .filter(|p| p.price > 100.0)
        .collect();

    println!("Expensive products: {:?}", expensive_products);

    // 使用 HashMap
    let mut product_map: HashMap<u32, Product> = HashMap::new();
    for product in products {
        product_map.insert(product.id, product);
    }

    // 计算折扣后价格
    if let Some(product) = product_map.get(&1) {
        println!("Original price: ${}", product.price);
        println!("With 10% discount: ${:.2}", product.with_discount(0.1));
    }
}
```

## SQL

### 数据库查询示例

```sql
-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据
INSERT INTO users (username, email)
VALUES
    ('john_doe', 'john@example.com'),
    ('jane_smith', 'jane@example.com'),
    ('bob_wilson', 'bob@example.com');

-- 更新数据
UPDATE users
SET updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- 复杂查询
SELECT
    u.username,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.username, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;

-- 窗口函数
SELECT
    username,
    email,
    created_at,
    RANK() OVER (ORDER BY created_at) as user_rank,
    COUNT(*) OVER () as total_users
FROM users;
```

## Bash

### Shell 脚本示例

```bash
#!/bin/bash

# 自动化部署脚本

set -e  # 遇到错误时退出

# 配置变量
PROJECT_NAME="my-app"
BUILD_DIR="build"
REMOTE_USER="deploy"
REMOTE_HOST="example.com"
REMOTE_PATH="/var/www/$PROJECT_NAME"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 清理旧构建
log_info "Cleaning old builds..."
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

# 安装依赖
log_info "Installing dependencies..."
npm install

# 运行测试
log_info "Running tests..."
npm test

# 构建项目
log_info "Building project..."
npm run build

# 部署到远程服务器
log_info "Deploying to remote server..."
rsync -avz --delete \
    $BUILD_DIR/ \
    $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

log_info "Deployment completed successfully!"
```

## 配置文件示例

### YAML 配置

```yaml
# application.yml
server:
  port: 8080
  host: "0.0.0.0"
  mode: "production"

database:
  driver: "postgresql"
  host: "localhost"
  port: 5432
  name: "myapp_db"
  ssl_mode: "require"
  pool:
    min_connections: 5
    max_connections: 20

logging:
  level: "info"
  format: "json"
  outputs:
    - type: "stdout"
    - type: "file"
      path: "/var/log/app.log"
      max_size: "100M"
      max_age: 7
      max_backups: 3

features:
  authentication:
    enabled: true
    providers:
      - "github"
      - "google"
  rate_limiting:
    enabled: true
    requests_per_minute: 60
```

这些示例展示了 Hugo 对各种编程语言和文件类型的出色语法高亮支持！
