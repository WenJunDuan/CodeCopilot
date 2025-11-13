---
allowed-tools: Task, Read, Write, Bash
argument-hint: "执行任务描述"
description: E执行开发阶段命令 - 代码实现、测试、文档编写
---

# /execute - E执行开发阶段命令

## 命令说明

执行RIPER-6的E（Execute）阶段，进行代码实现、测试和文档编写。

## 执行流程

```markdown
=== E-EXECUTE 阶段 ===

**LD**:
1. 从shrimp-task-manager获取任务
2. 实现代码
3. 使用playwright进行测试
4. 使用mcp-git-ops提交代码
5. 更新任务状态

**QE**:
- 并行进行测试
- 报告缺陷
- 验证修复

**PM**:
- 监控进度（get_summary）
- 协调资源
- 里程碑汇报

**DW**:
- 同步更新文档
- 记录关键决策
```

## 输出
- 实现的代码（/project_document/code/）
- 测试脚本
- API文档
- 更新的任务状态

---

**建议**: 通常通过 `/develop` 自动调用，无需单独使用。
