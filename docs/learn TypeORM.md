使用 ORM 的过程中，你是否了解过 Data Mapper 与 Active Record 这两种模式的区别？

先来看看 TypeORM 中分别是如何使用这两种模式的：

## Active Record:

```ts
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isActive: boolean;
}

const user = new User();
user.name = '不渡';
user.isActive = true;

await user.save();

const newUsers = await User.find({ isActive: true });
```

让实体类继承`BaseEntity`类, 这样实体类上就具有了各种方法，如 save remove find 方法等, 这一模式使得对象上拥有了相关的 CRUD 方法。

## Data Mapper:

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isActive: boolean;
}

const userRepository = connection.getRepository(User);

const user = new User();
user.name = '不渡';
user.isActive = true;

await userRepository.save(user);

await userRepository.remove(user);

const newUsers = await userRepository.find({ isActive: true });
```

可以看到在 Data Mapper 模式中，实体类不再能够自己进行数据库操作，而是需要先获取到一个对应到表的“仓库”，然后再调用这个“Repository”上的方法。

Data Mapper 更像是一层拦在操作者与实际数据之间的访问层，再进行数据的操作。

对这两个模式进行比较，很容易发现 Active Record 模式要简单的多，而 Data Mapper 模式则更加严谨。那么何时使用这两种模式就很清楚了，如果你在开发比较简单的应用，直接使用 Active Record 模式就好了，因为这确实会减少很多代码。但是如果你在开发规模较大的应用，使用 Data Mapper 模式则能够帮助你更好的维护代码（实体类不再具有访问数据库权限了，只能通过统一的接口(getRepository getManager 等)）
