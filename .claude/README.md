# 🚀 AI编程协作系统 - 安装和使用指南

## 📁 目录结构说明

### 正确的目录位置

**`.claude` 目录应该放在你的项目根目录下**，而不是Claude Code的安装目录！

```
你的项目目录/                    ← 你的实际项目
├── .claude/                     ← 解压到这里！
│   ├── agents/                  ← Agent定义
│   ├── commands/                ← 工作流命令
│   ├── hooks/                   ← 自动化脚本
│   ├── mcp/                     ← MCP配置
│   ├── templates/               ← 文档模板
│   ├── project_document/        ← 当前项目的知识库
│   │   ├── research/            ← 项目研究成果
│   │   ├── proposals/           ← 项目方案设计
│   │   ├── plans/               ← 项目计划
│   │   ├── code/                ← 项目代码产出
│   │   └── reviews/             ← 项目审查报告
│   └── settings.json            ← Claude Code配置
│
├── src/                         ← 你的项目源代码
├── tests/                       ← 你的项目测试
├── README.md                    ← 你的项目README
└── ...其他项目文件

```

## ✅ 正确的安装步骤

### 步骤1：选择或创建项目目录

```bash
# 方式A：已有项目
cd /path/to/your/existing/project

# 方式B：新建项目
mkdir my-new-project
cd my-new-project
```

### 步骤2：解压 .claude 目录到项目根目录

```bash
# 确保你在项目根目录
pwd
# 应该显示：/path/to/your/project

# 解压
tar -xzf claude-ai-system.tar.gz

# 验证
ls -la
# 应该能看到 .claude/ 目录
```

### 步骤3：验证目录结构

```bash
# 查看 .claude 目录
ls -la .claude/

# 应该看到：
# agents/
# commands/
# hooks/
# mcp/
# templates/
# project_document/
# settings.json
# README.md
```

### 步骤4：确认权限

```bash
# 确保Hook脚本可执行
chmod +x .claude/hooks/*.py

# 验证
ls -l .claude/hooks/*.py
# 应该看到 -rwxr-xr-x
```

## 🎯 project_document 说明

### project_document 的作用

`project_document/` 是**当前项目**的知识库，用于存储：

```
.claude/project_document/
├── research/                    ← 当前项目的研究成果
│   ├── requirements_analysis.md  # 需求分析报告
│   ├── tech_research.md          # 技术调研报告
│   └── memory_recall.md          # 历史经验回忆
│
├── proposals/                   ← 当前项目的方案设计
│   ├── architecture_design.md    # 架构设计文档
│   └── technical_proposal.md     # 技术方案
│
├── plans/                       ← 当前项目的计划
│   ├── project_plan.md           # 项目计划
│   └── acceptance_criteria.md    # 验收标准
│
├── code/                        ← 当前项目的代码产出
│   └── (生成的代码文件)
│
└── reviews/                     ← 当前项目的审查报告
    ├── code_review.md            # 代码审查报告
    └── product_review.md         # 产品评审报告
```

### 文档生成时机

当你使用命令时，系统会自动在 `project_document/` 生成相应文档：

```bash
# 使用 /research 命令
/research "用户登录功能需求分析"
# ↓ 自动生成
# .claude/project_document/research/requirements_analysis.md

# 使用 /innovate 命令
/innovate "设计系统架构"
# ↓ 自动生成
# .claude/project_document/proposals/architecture_design.md

# 使用 /review 命令
/review "项目总结"
# ↓ 自动生成
# .claude/project_document/reviews/product_review.md
```

## 🔧 多项目使用方案

### 方案A：每个项目独立配置（推荐）

```
项目A/
└── .claude/              ← 解压一份
    └── project_document/ ← 项目A的文档

项目B/
└── .claude/              ← 解压一份
    └── project_document/ ← 项目B的文档

项目C/
└── .claude/              ← 解压一份
    └── project_document/ ← 项目C的文档
```

**优点**：
- 每个项目完全独立
- 可以针对不同项目定制配置
- 项目文档完全隔离

### 方案B：共享配置，独立文档

如果你想共享Agent和Command定义，可以使用符号链接：

```bash
# 创建共享配置目录
mkdir ~/claude-shared-config
cd ~/claude-shared-config
tar -xzf claude-ai-system.tar.gz
mv .claude/* .

# 在每个项目中创建链接
cd /path/to/project-A
mkdir -p .claude

# 链接共享内容
ln -s ~/claude-shared-config/agents .claude/agents
ln -s ~/claude-shared-config/commands .claude/commands
ln -s ~/claude-shared-config/hooks .claude/hooks
ln -s ~/claude-shared-config/mcp .claude/mcp
ln -s ~/claude-shared-config/templates .claude/templates

# 但保持独立的 project_document
mkdir -p .claude/project_document/{research,proposals,plans,code,reviews}

# 复制配置文件（可以按项目调整）
cp ~/claude-shared-config/settings.json .claude/
```

## 📋 实际使用流程示例

### 示例：开发一个电商系统

```bash
# 1. 创建项目目录
mkdir ecommerce-system
cd ecommerce-system

# 2. 解压 .claude 配置
tar -xzf ~/Downloads/claude-ai-system.tar.gz

# 3. 初始化项目结构
mkdir -p src tests docs

# 4. 开始使用 - 需求分析
/research "电商系统需求分析"
# 生成: .claude/project_document/research/requirements_analysis.md

# 5. 团队讨论
/meeting "讨论技术架构方案"
# 生成会议记录

# 6. 设计方案
/innovate "设计微服务架构"
# 生成: .claude/project_document/proposals/architecture_design.md

# 7. 制定计划
/plan "开发计划和任务分解"
# 使用 shrimp-task-manager 生成任务计划

# 8. 开始开发
/execute "实现用户服务模块"
# 生成: .claude/project_document/code/user-service/...

# 9. 代码审查
/review "用户服务代码审查"
# 生成: .claude/project_document/reviews/code_review.md

# 10. 或者使用完整流程
/develop "实现订单管理功能"
# 自动执行完整的 RIPER-6 流程
```

### 查看生成的文档

```bash
# 查看需求分析
cat .claude/project_document/research/requirements_analysis.md

# 查看架构设计
cat .claude/project_document/proposals/architecture_design.md

# 查看所有生成的文档
find .claude/project_document -name "*.md" -type f
```

## 🎯 Claude Code 工作原理

### Claude Code 如何识别 .claude 目录

1. Claude Code 启动时，会在**当前工作目录**查找 `.claude` 目录
2. 读取 `.claude/settings.json` 加载配置
3. 加载 `.claude/agents/` 中的Agent定义
4. 加载 `.claude/commands/` 中的Command定义
5. 注册 `.claude/hooks/` 中的Hook脚本

### 环境变量

在 `.claude/settings.json` 中：

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/context-enhancer.py"
      }
    ]
  }
}
```

`$CLAUDE_PROJECT_DIR` 会自动被替换为项目根目录的绝对路径。

## ❌ 常见错误

### 错误1：把 .claude 放错位置

```
❌ 错误：
C:\Program Files\Claude Code\.claude\      # 不要放这里！
/Applications/Claude.app/.claude/          # 不要放这里！

✅ 正确：
/path/to/your/project/.claude/             # 放在项目根目录
```

### 错误2：忘记给 Hook 脚本执行权限

```bash
# 如果遇到 Permission denied
chmod +x .claude/hooks/*.py
```

### 错误3：相对路径问题

```bash
# 确保你在项目根目录执行命令
cd /path/to/your/project

# 然后再使用命令
/develop "实现功能"
```

## 🔍 验证安装

### 快速验证脚本

```bash
#!/bin/bash
# 保存为 verify-installation.sh

echo "=== Claude AI 系统安装验证 ==="
echo ""

# 检查当前目录
echo "1. 当前目录："
pwd
echo ""

# 检查 .claude 目录
if [ -d ".claude" ]; then
    echo "✅ .claude 目录存在"
else
    echo "❌ .claude 目录不存在！"
    exit 1
fi

# 检查 Agents
echo ""
echo "2. Agents 检查："
ls -lh .claude/agents/*.md 2>/dev/null | wc -l | xargs echo "   找到" | xargs -I {} echo "{} 个 Agent 文件"

# 检查 Commands
echo ""
echo "3. Commands 检查："
ls -lh .claude/commands/*.md 2>/dev/null | wc -l | xargs echo "   找到" | xargs -I {} echo "{} 个 Command 文件"

# 检查 Hooks
echo ""
echo "4. Hooks 检查："
for hook in .claude/hooks/*.py; do
    if [ -x "$hook" ]; then
        echo "   ✅ $(basename $hook) - 可执行"
    else
        echo "   ❌ $(basename $hook) - 不可执行（运行: chmod +x $hook）"
    fi
done

# 检查配置
echo ""
echo "5. 配置文件检查："
[ -f ".claude/settings.json" ] && echo "   ✅ settings.json" || echo "   ❌ settings.json"
[ -f ".claude/mcp/tool-bindings.json" ] && echo "   ✅ tool-bindings.json" || echo "   ❌ tool-bindings.json"

# 检查 project_document
echo ""
echo "6. project_document 目录："
for dir in research proposals plans code reviews; do
    [ -d ".claude/project_document/$dir" ] && echo "   ✅ $dir/" || echo "   ❌ $dir/"
done

echo ""
echo "=== 验证完成 ==="
```

运行验证：
```bash
chmod +x verify-installation.sh
./verify-installation.sh
```

## 📚 下一步

安装完成后：

1. **配置 MCP 服务器** - 确保你的 Claude 环境已配置所有 MCP 工具
2. **阅读文档** - 查看 `.claude/README.md` 了解详细使用方法
3. **尝试命令** - 从简单的 `/research` 命令开始
4. **查看生成的文档** - 在 `project_document/` 中查看输出

## 🆘 获取帮助

如果遇到问题：

1. 运行验证脚本检查安装
2. 查看 `.claude/README.md`
3. 查看各个 Agent 文件中的详细说明
4. 确认 MCP 工具配置正确

---

**重点总结**：
- ✅ `.claude` 放在**项目根目录**
- ✅ `project_document` 存储**当前项目**的文档
- ✅ 每个项目可以有自己的 `.claude` 配置
- ✅ 使用命令时，文档会自动生成到 `project_document/`

**现在开始使用吧！** 🚀