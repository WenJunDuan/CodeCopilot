---
allowed-tools: Task, Read, Write, Bash
argument-hint: "规划主题"
description: P计划制定阶段命令 - 任务分解、依赖管理、里程碑规划
---

# /plan - P计划制定阶段命令

## 命令说明

执行RIPER-6的P（Plan）阶段，使用shrimp-task-manager进行任务规划。

## 执行流程

```markdown
=== P-PLAN 阶段 ===

**PM**:
使用shrimp-task-manager：

1. create_project(name, description)
2. 基于需求和设计创建任务树
3. 设置任务依赖关系
4. 标记优先级(P0/P1/P2)
5. 设置里程碑
6. 分配责任人

**AR**: 协助技术任务分解
**PDM**: 确认需求任务优先级
```

## 输出
- shrimp-task-manager中的项目计划
- 任务清单
- 依赖关系图
- 里程碑时间表

---

**建议**: 通常通过 `/develop` 自动调用，无需单独使用。
