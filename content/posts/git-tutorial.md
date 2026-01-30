---
title: "Git 常用命令指南"
date: 2024-01-25T10:00:00+08:00
draft: false
tags: ["Git", "版本控制", "教程"]
categories: ["技术"]
---

Git 是目前最流行的分布式版本控制系统。本文整理了日常开发中最常用的 Git 命令。

## 基础命令

### 初始化与配置

```bash
# 初始化新仓库
git init

# 克隆远程仓库
git clone <repository-url>

# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

### 日常操作

```bash
# 查看状态
git status

# 添加文件到暂存区
git add .
git add filename
git add *.js

# 提交更改
git commit -m "commit message"

# 查看提交历史
git log
git log --oneline
git log --graph --all
```

## 分支管理

### 分支操作

```bash
# 查看所有分支
git branch

# 创建新分支
git branch feature-branch

# 切换分支
git checkout feature-branch
# 或者使用新语法
git switch feature-branch

# 创建并切换到新分支
git checkout -b new-branch
git switch -c new-branch

# 删除分支
git branch -d branch-name
git branch -D branch-name  # 强制删除

# 重命名分支
git branch -m old-name new-name
```

### 合并分支

```bash
# 合并分支到当前分支
git merge feature-branch

# 变基（整理提交历史）
git rebase main

# 解决冲突后继续
git add .
git rebase --continue
```

## 远程操作

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin <url>

# 推送到远程
git push origin main
git push -u origin feature-branch  # 设置上游分支

# 拉取更新
git pull origin main
git pull --rebase  # 使用 rebase 方式拉取

# 获取远程更新但不合并
git fetch origin
```

## 常用技巧

### 撤销操作

```bash
# 撤销工作区的修改
git restore filename
git checkout -- filename  # 旧语法

# 撤销暂存区的修改
git restore --staged filename
git reset HEAD filename  # 旧语法

# 撤销提交（保留修改）
git reset --soft HEAD~1

# 撤销提交（不保留修改）
git reset --hard HEAD~1

# 回到某个提交
git reset --hard <commit-hash>
```

### 查看差异

```bash
# 查看工作区与暂存区的差异
git diff

# 查看暂存区与最后一次提交的差异
git diff --staged
git diff --cached

# 查看两个提交之间的差异
git diff commit1 commit2
```

### 暂存功能

```bash
# 暂存当前工作
git stash
git stash save "message"

# 查看暂存列表
git stash list

# 应用暂存
git stash apply
git stash pop  # 应用并删除

# 删除暂存
git stash drop
git stash clear  # 删除所有
```

## 常见工作流

### 功能开发流程

```bash
# 1. 从 main 创建功能分支
git checkout -b feature/new-feature

# 2. 开发并提交
git add .
git commit -m "Add new feature"

# 3. 推送到远程
git push -u origin feature/new-feature

# 4. 合并到 main（通过 Pull Request）
# 在 GitHub/GitLab 上创建 PR
```

### 紧急修复流程

```bash
# 1. 创建 hotfix 分支
git checkout -b hotfix/critical-fix

# 2. 快速修复并提交
git add .
git commit -m "Fix critical bug"

# 3. 合并到 main 和 develop
git checkout main
git merge hotfix/critical-fix
git push origin main
```

## 最佳实践

1. **提交信息规范**
   - 使用清晰、具体的提交信息
   - 推荐使用约定式提交：`feat:`, `fix:`, `docs:` 等

2. **分支管理**
   - main/master 分支保持稳定
   - 使用功能分支开发新功能
   - 及时删除已合并的分支

3. **提交频率**
   - 小步快跑，频繁提交
   - 逻辑完整的单元作为一个提交

4. **代码审查**
   - 通过 Pull Request 进行代码审查
   - 保持代码质量

## 参考资源

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub Git 指南](https://guides.github.com/introduction/git-handbook/)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)

掌握这些命令，日常开发就完全够用了！
