import Repository from "./Repository";

abstract class Service {

  repositories: Repository<T, U>[];
}