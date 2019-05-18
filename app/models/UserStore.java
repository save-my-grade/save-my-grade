package models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class UserStore {
    private Map<Integer, User> users = new HashMap<>();

    private UserStore() {
    }

    private static UserStore INSTANCE = new UserStore();

    public static UserStore getInstance() {
        return INSTANCE;
    }


    public User addUser(User user) {
        int id = users.size();
        user.setId(id);
        users.put(id, user);
        return user;
    }

    public User getUser(int id) {
        return users.get(id);
    }

    public Set<User> getAllUsers() {
        return new HashSet<>(users.values());
    }

    public User updateUser(User user) {
        int id = user.getId();
        if (users.containsKey(id)) {
            users.put(id, user);
            return user;
        }
        return null;
    }
}
