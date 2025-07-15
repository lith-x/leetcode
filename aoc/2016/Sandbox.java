public class Sandbox {
    private String getPetStatement(Pet p) {
        return switch (p) {
            case Dog dog -> {
                yield "Your dog's name is %s.".formatted(dog.getName());
            }
            case Cat cat -> "Your cat's name is %s.".formatted(cat.getName());
            case Bird bird -> "Your bird's name is %s.".formatted(bird.getName());
            case Pet p -> "Generic pets don't have names :/";
            default -> "This isn't a pet!";
        };
    }

    public static void main(String[] args) {

    }
}

abstract class Pet {
    public Pet(String name) {
    }
}

final class Dog extends Pet {
    private String name;

    public String getName() {
        return this.name;
    }

    public Dog(String name) {
        super(name);
    }
}

final class Cat extends Pet {
    private String name;

    public String getName() {
        return this.name;
    }

    public Cat(String name) {
        super(name);
    }
}

final class Bird extends Pet {
    private String name;

    public String getName() {
        return this.name;
    }

    public Bird(String name) {
        super(name);
    }
}