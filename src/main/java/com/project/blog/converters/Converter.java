package com.project.blog.converters;

import java.util.List;

public interface Converter<E,D> {

    D toDTO(E entity);
    E toEntity(D dto);

    default List<D> toDTOList(List<E> entities) {
        return entities.stream().map(this::toDTO).toList();
    }

    default List<E> toEntityList(List<D> dtos){
        return dtos.stream().map(this::toEntity).toList();
    }
}
